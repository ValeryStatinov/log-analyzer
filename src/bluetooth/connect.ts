/* eslint-disable */
// @ts-nocheck

const SERVICE_UUID = '8fe5b3d5-2e7f-4a98-2a48-7acc60fe0000'
const RX_UUID = '19ed82ae-ed21-4c9d-4145-228e62fe0000'
const TX_UUID = '19ed82ae-ed21-4c9d-4145-228e61fe0000'
const FLOW_CONTROL_UUID = '19ed82ae-ed21-4c9d-4145-228e63fe0000'

const OPTIONS = {
  filters: [{ services: [0x3081] }],
  optionalServices: [SERVICE_UUID],
}

// ping buffer size is 11
const PING_BUFFER = new Uint8Array([10, 42, 8, 10, 6, 222, 173, 186, 186, 202, 202]).buffer

class BluetoothClient {
  isPingingDevice = false
  pauseSendingPromise: Promise<void>
  capacity: number
  pauseSendingResolver: () => void

  constructor() {
    this.pauseSendingPromise = new Promise((resolve) => {
      this.pauseSendingResolver = resolve
    })
  }

  async connect() {
    const device = await navigator.bluetooth.requestDevice(OPTIONS)
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService(SERVICE_UUID)
    const tx = await service.getCharacteristic(TX_UUID)
    const flowControl = await service.getCharacteristic(FLOW_CONTROL_UUID)
    const rx = await service.getCharacteristic(RX_UUID)

    const flowControlCapacity = await flowControl.readValue()
    this.capacity = flowControlCapacity.getUint32()

    this.tx = tx
    this.rx = rx
    this.flowControl = flowControl

    await this.subscribeToCharacteristic(tx, this.handleTxValueChanged)
    await this.subscribeToCharacteristic(flowControl, this.handleFlowControlValueChanged)

    console.log('initialized')
  }

  async subscribeToCharacteristic(characteristic, handler) {
    await characteristic.startNotifications()
    characteristic.addEventListener('characteristicvaluechanged', handler)
  }

  async subscribeFromCharacteristic(characteristic, handler) {
    await characteristic.stopNotifications()
    characteristic.removeEventListener('characteristicvaluechanged', handler)
  }

  handleTxValueChanged = (event) => {
    const dataView = event.target.value as DataView

    console.log('got notification from tx', new Uint8Array(dataView.buffer))
  }

  handleFlowControlValueChanged = (event) => {
    const flowControlCapacity = event.target.value as DataView

    console.log('got notification from flowControl', flowControlCapacity.getUint32())

    this.capacity = flowControlCapacity.getUint32()
    this.pauseSendingResolver()
  }

  async sendData(characteristic, data: ArrayBuffer) {
    console.log('send data', data.byteLength, this.capacity)

    if (data.byteLength < this.capacity) {
      this.capacity -= data.byteLength
      await characteristic.writeValueWithResponse(data)

      return
    }

    const slicedDataPart = data.slice(0, this.capacity)
    const sliceStart = this.capacity
    this.capacity = 0
    await characteristic.writeValueWithResponse(slicedDataPart)

    await this.pauseSendingPromise
    this.pauseSendingPromise = new Promise((resolve) => {
      this.pauseSendingResolver = resolve
    })

    const slicedDataRest = data.slice(sliceStart)
    await characteristic.writeValueWithResponse(slicedDataRest)
  }

  async startPingDevice() {
    console.log('start ping')
    this.isPingingDevice = true

    while (this.isPingingDevice) {
      await this.sendData(this.rx, PING_BUFFER)
    }
  }

  stopPingDevice() {
    console.log('stop ping')
    this.isPingingDevice = false
  }
}

export const bluetoothClient = new BluetoothClient()
