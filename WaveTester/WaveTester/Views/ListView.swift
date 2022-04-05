//
//  ListView.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/3/22.
//

import SwiftUI

struct ListView: View {
    
    @State var items: [String] = [
        "First Item",
        "2nd",
        "3rd"
    ]
    var body: some View {
        List {
            ForEach(items, id: \.self) {
                item in ListRowView(title: item)
            }
        }
        .navigationTitle("Wordrobe 👔")        .navigationBarItems(
            leading: EditButton(),
            trailing:
                NavigationLink("Add", destination: AddView())
        )
    }
}

struct ListView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ListView()
        }
    }
}

