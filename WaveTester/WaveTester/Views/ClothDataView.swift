//
//  ClothDataView.swift
//  WaveTester
//
//  Created by Arka Pal on 4/8/22.
//
import SwiftUI
import Foundation

struct ClothDataView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel:ListViewModel

    @State var textFieldText: String = ""
    @State var color_sample: String = ""
    var ratingOptions = ["1","2","3","4","5","6","7","8","9","10"]
    var typeOptions = ["Shirts", "OverTops", "Pants", "Shorts", "Shoes", "Hat", "Misc"]
    var shirtOptions = ["Tank Tops", "Button Up", "Tee", "Polo Shirt", "Graphic", "Athletic", "Long Sleeve Button Up", "Long Sleeve Polo", "Long Sleeve Tee", "Long Sleeve Graphic", "Long Sleeve Athletics", "Flannel "]
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
    @State private var rating = 0
    @State private var color = Color.blue
    @State private var recent_date = Date()
    @State private var current_date = Date()
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
                        Section(header: Text("\(ctype) Color")) {
//                            Picker(selection: $previewIndex, label: Text("Tap to Choose")) {
//                                ForEach(0 ..< colorOptions.count) {
//                                    Text(self.colorOptions[$0])
//                                }
//                            }
                            ColorPicker("", selection: $color)
                                      .frame(maxWidth: .infinity, maxHeight: .infinity)
                                      .background(color)

                        }
                        Section(header: Text("Most recent date worn")) {
                            DatePicker("", selection: $recent_date)
                        }
                        Section(header: Text("Number of Times Worn")) {
                            TextField("Ex: 3", text: $color_sample)
                        }
                        
                        Section(header: Text("Choose rating from 1-10(10 being highest rank)")) {
                            Picker(selection: $rating, label: Text("Tap to Choose")) {
                                ForEach(0 ..< ratingOptions.count) {
                                    Text(self.ratingOptions[$0])
                                }
                            }
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
            var cloth_entry = Clothes(id:0, R_COLOR:0, G_COLOR:0, B_COLOR:0, TYPE: "N/A",RECENT_DATE_WORN:"N/A", TIMES_WORN: 0,RATING:0,OC_FORMAL:0,OC_SEMI_FORMAL:0,OC_CASUAL:0,OC_WORKOUT:0, OC_OUTDOORS:0, OC_COMFY:0,WE_COLD:0,WE_HOT:0,WE_RAINY:0,WE_SNOWY: 0,WE_AVG_TMP:0)
                   
                                    }
          }
    func saveButtonPressed() {
        listViewModel.addItem(title: textFieldText)
        presentationMode.wrappedValue.dismiss()
    }
}

struct ClothDataView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView{
            AddView()
        }
        .environmentObject(ListViewModel())
    }
}
