//
//  AddView.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/4/22.
//

import SwiftUI

struct AddView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel:ListViewModel
    @State var textFieldText: String = ""
    
    var body: some View {
        ScrollView{
            VStack {
                TextField("Type Here", text: $textFieldText)
                    .padding(.horizontal)
                    .frame(height: 55)
                    //.background("grey")
                    .cornerRadius(10)
                Button(action: saveButtonPressed, label: {
                    Text("Save")
                        .foregroundColor(.white)
                        .frame(height: 55)
                        .frame(maxWidth: .infinity)
                        .background(Color.accentColor)
                        .cornerRadius(10)
                })
                    .navigationBarItems(
                        trailing:
                            NavigationLink("Next", destination: CheckListView())

                    )
                
                    
                   
            }.padding(14)
                
        }
        .navigationTitle("Add Clothing 👕")
    }
    func saveButtonPressed() {
        listViewModel.addItem(title: textFieldText)
        presentationMode.wrappedValue.dismiss()
    }
}

struct AddView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView{
            AddView()
        }
        .environmentObject(ListViewModel())
    }
}
