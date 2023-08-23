import { Pressable, Text, View } from "react-native";

const ContextMenu = ({ position }) => {
  return (
    <View
      style={{
        backgroundColor: "#1a1a1a",
        padding: 20,
        position: "absolute",
        left: position.x,
        top: position.y - 100,
      }}
    >
      {/* // Gesture Detector */}
      <Text style={{ color: "#fff" }}>CONTEXT Menu</Text>
      <Pressable>
        <Text style={{ color: "#fff" }}>Mark read/unread</Text>
      </Pressable>
      <Pressable>
        <Text style={{ color: "#fff" }}>Report</Text>
      </Pressable>
    </View>
  );
};

export default ContextMenu;
