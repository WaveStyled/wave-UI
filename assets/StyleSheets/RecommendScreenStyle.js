import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container1: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "center",
    backgroundColor: "#dfe3ee",
    paddingVertical: "8%",
  },
  container: {
    flex: 1,
    fontFamily: "OpenSansBold",

  },
  commandButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2874A6",
    alignItems: "center",
    marginTop: 15,
  },
  panel: {
    padding: 20,
    backgroundColor: "#58D68D",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#E8EAED",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: "5%",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#45B39D",
    alignItems: "center",
    marginVertical: 7,
    
  },
  panelButtonTitle: {
    fontSize: 17,
    fontFamily: "OpenSansBold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    paddingTop: 20,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});

export const styles_multi = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  multiSelectContainer: {
    height: "20%",
    width: "80%",
  },
});
