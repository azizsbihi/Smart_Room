import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';

void onRefresh() {
  print("Refreshing");
}

void main() => runApp(MaterialApp(home: ChooseDevice()));

class ChooseDevice extends StatefulWidget {
  const ChooseDevice({super.key});

  @override
  State<ChooseDevice> createState() => ChooseDeviceState();
}

class ChooseDeviceState extends State<ChooseDevice> {
  List<String> devices = ["Device 1", "Device 2", "Device 3"];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Connect to bluetooth"),
        centerTitle: true,
        backgroundColor: Colors.green,
      ),
      body: Column(children: devices.map((d) => Text(d)).toList()),
      floatingActionButton: FloatingActionButton(
        onPressed: onRefresh,
        child: Icon(Icons.refresh),
        backgroundColor: Colors.green,
      ),
    );
  }
}

class PairedDevice extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [Text("Device name"), Icon(Icons.bluetooth)],
      ),
    );
  }
}
