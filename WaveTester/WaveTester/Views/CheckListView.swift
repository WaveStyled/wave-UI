//
//  CheckListView.swift
//  WaveTester
//
//  Created by Arka Pal on 4/8/22.
//

import SwiftUI


struct CheckListView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel:ListViewModel
    @State var textFieldText: String = ""
    @State var color_sample: String = ""
    var typeOptions = ["Shirts", "OverTops", "Pants", "Shorts", "Shoes", "Hat", "Misc"]
    var shirtOptions = ["Shirts", "Button Up", "Tee", "Polo Shirt", "Graphic", "Athletic", "Long Sleeve Button Up", "Long Sleeve Polo", "Long Sleeve Tee", "Long Sleeve Graphic", "Long Sleeve Athletics", "Flannel "]
    var overtopOptions = ["Sweatshirt", "Hoodie", "Jacket",
                          "Blazer", "Coats", "Vest", "Puffer Jacket"]
    var pantOptions = ["Skirt", "Yoga pants", "Cargo Pants", "Jeans", "Sweatpants", "Track Pants", "Dress Pants", "Pajamas"]
    
    var shortOptions = ["Regular", "Swimshorts", "Sweatshorts", "Athletic Shorts"]
    
    var shoesOptions = ["Sneakers", "Runners", "Boots", "Dress", "Sandals", "Flip Flops", "Heels", "Flats"]
   
    var hatOptions = ["Beanie", "Baseball", "Snapback", "Bucket", "Visor", "Regular Hat"]
    
    var miscOptions = ["Dress", "Tux"]
    
    
    var colorOptions = ["Blue", "Red", "Green", "Yellow", "Purple", "Pink"]
    var occasionOptions = ["Workout", "Formal", "Semi Formal", "Casual", "Beach Day/Outdoors", "Comfy/Lazy"]
    var wheatherOptions = ["Cold", "Hot", "Rainy", "Sunny", "Snowy", "Typical"]
    @State private var cloth = ""
    @State private var ctype = "cloth type"
    @State private var previewIndex = 0
    var body: some View {
        NavigationView {
                    Form {
                        Section(header: Text("Clothing Type")) {
                            Picker(selection: $cloth, label: Text("Tap to Choose")) {
                                ForEach(typeOptions, id: \.self) {
                                    Text($0)
                                }
                            }
                            Picker(selection: $ctype, label: Text("\(cloth) Type")) {
                                if(cloth == "Shirts"){
                                    
                                    
                                    ForEach(shirtOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                }
                                else if(cloth == "OverTops"){
                                    
                                    
                                    ForEach(overtopOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                }
                                else if(cloth == "Pants"){
                                    
                                    
                                    ForEach(pantOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                }
                                
                                else if(cloth == "Shorts"){
                                    
                                    
                                    ForEach(shortOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                }
                                else if(cloth == "Shoes"){
                                    
                                    
                                    ForEach(shoesOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                }
                                
                                else if(cloth == "Hat"){
                                    
                                    
                                    ForEach(hatOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                }
                                else if(cloth == "Misc"){
                                    ForEach(miscOptions, id: \.self) {
                                       
                                        Text($0)
                                    }
                                    
                                }
                                
                               
                            }

                        }
                        Section(header: Text("Color")) {
                            Picker(selection: $previewIndex, label: Text("Tap to Choose")) {
                                ForEach(0 ..< colorOptions.count) {
                                    Text(self.colorOptions[$0])
                                }
                            }

                        }
                        Section(header: Text("Number of Times Worn")) {
                            TextField("Ex: 3", text: $color_sample)
                        }
                        Section(header: Text("Occasion")) {
                            Picker(selection: $previewIndex, label: Text("Tap to Choose")) {
                                ForEach(0 ..< occasionOptions.count) {
                                    Text(self.occasionOptions[$0])
                                }
                            }
                        }
                        Section(header: Text("Weather")) {
                            Picker(selection: $previewIndex, label: Text("Tap to Choose")) {
                                ForEach(0 ..< wheatherOptions.count) {
                                    Text(self.wheatherOptions[$0])
                                }
                            }
                        }
                        
                        


                        
                    }
                    .navigationBarTitle("Item Details")
                   
                                    }
          }
    func saveButtonPressed() {
        listViewModel.addItem(title: textFieldText)
        presentationMode.wrappedValue.dismiss()
    }
}

struct CheckListView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView{
            AddView()
        }
        .environmentObject(ListViewModel())
    }
}



