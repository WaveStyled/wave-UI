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
    @State private var num_times = ""
    @State private var color_str = ""
    @State private var color = Color.blue
    @State private var recent_date = Date()
    @State private var occasion = ""
    @State private var weather = ""
    
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
                            Picker(selection: $color_str, label: Text("Tap to Choose")) {
                                ForEach(colorOptions, id: \.self) {
                                    Text($0)
                                }
                            }
//                            ColorPicker("", selection: $color)
//                                      .frame(maxWidth: .infinity, maxHeight: .infinity)
//                                      .background(color)

                        }
                        Section(header: Text("Most recent date worn")) {
                            DatePicker("", selection: $recent_date)
                        }
                        Section(header: Text("Number of Times Worn")) {
                            TextField("Ex: 3", text: $num_times)
                        }
                        
                        Section(header: Text("Choose rating from 1-10(10 being highest rank)")) {
                            Picker(selection: $rating, label: Text("Tap to Choose")) {
                                ForEach(0 ..< ratingOptions.count) {
                                    Text(self.ratingOptions[$0])
                                }
                            }
                        }
                       
                        Section(header: Text("Occasion")) {
                            Picker(selection: $occasion, label: Text("Tap to Choose")) {
                                ForEach(occasionOptions, id: \.self ) {
                                    Text($0)
                                }
                            }
                        }
                        Section(header: Text("Weather")) {
                            Picker(selection: $weather, label: Text("Tap to Choose")) {
                                ForEach(wheatherOptions, id: \.self) {
                                    Text($0)
                                }
                            }
                        }
                        
                        
                        

                        Button(action: saveButtonPressed, label: {
                            Text("Submit")
                                .foregroundColor(.white)
                                .frame(height: 55)
                                .frame(maxWidth: .infinity)
                                .background(Color.accentColor)
                                .cornerRadius(10)
                        })
                        
                    }
                    .navigationBarTitle("Item Details")

     
            let ocf:Int = occasion == "Formal" ? 1 : 0
            let ocsf:Int = occasion == "Semi Formal" ? 1 : 0
            let occ:Int = occasion == "Casual" ? 1 : 0
            let ocw:Int = occasion == "Workout" ? 1 : 0
            let oco:Int = occasion == "Beach Day/Outdoors" ? 1 : 0
            let occom:Int = occasion == "Comfy/Lazy" ? 1 : 0
            let tcold :Int = weather == "Cold" ? 1 : 0
            //["Cold", "Hot", "Rainy", "Sunny", "Snowy", "Typical"]
            let thot:Int = weather == "Hot" ? 1 : 0
            let train:Int = weather == "Rainy" ? 1 : 0
            let tsun:Int = weather == "Sunny" ? 1 : 0
            let tsnow :Int = weather == "Snowy" ? 1 : 0
            let tavg :Int = weather == "Typical" ? 1 : 0
      
            let inttimes = Int(num_times) ?? 0
            
            var cloth_entry = Clothes(id: UUID(), COLOR: color_str, TYPE: cloth,RECENT_DATE_WORN: "10/2", TIMES_WORN:  inttimes ,RATING:rating,OC_FORMAL:ocf,OC_SEMI_FORMAL:ocsf,OC_CASUAL:occ,OC_WORKOUT:ocw, OC_OUTDOORS:oco, OC_COMFY:occom,WE_COLD:tcold,WE_HOT:thot,WE_RAINY:train, WE_SUNNY: tsun, WE_SNOWY: tsnow, WE_AVG_TMP:tavg)
                   
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
