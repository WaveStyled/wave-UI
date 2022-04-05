//
//  AddView.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/4/22.
//

import SwiftUI

struct AddView: View {
    @State var textFieldText: String = ""
    
    var body: some View {
        ScrollView{
            VStack {
                TextField("Type Here", text: $textFieldText)
                    .padding(.horizontal)
                    .frame(height: 55)
                    //.background("grey")
                    .cornerRadius(10)
                Button(action: {
                    
                }, label: {
                    Text("Save")
                        .foregroundColor(.white)
                        .frame(height: 55)
                        .frame(maxWidth: .infinity)
                        .background(Color.accentColor)
                        .cornerRadius(10)
                })
            }.padding(14)
        }
        .navigationTitle("Add Clothing 👕")
    }
}

struct AddView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView{
            AddView()
        }
    }
}
