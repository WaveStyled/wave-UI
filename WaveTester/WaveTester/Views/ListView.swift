//
//  ListView.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/3/22.
//

import SwiftUI

struct ListView: View {
    
    @State var items: [ItemModel] = [
      ItemModel(name: "Nike Sweatpants", type: "SWTP", warnRecent: true),
      ItemModel(name: "Bape Hoodie", type: "HOOT", warnRecent: false),
      ItemModel(name: "Adidas T-shirt", type: "STES", warnRecent: true)

    ]
    var body: some View {
        List {
            ForEach(items) {
                item in
                ListRowView(item: item)
                //ListRowView(title: item)
            }.onDelete(perform: deleteItem)
        }
        .navigationTitle("Wordrobe 👔")        .navigationBarItems(
            leading: EditButton(),
            trailing:
                NavigationLink("Add", destination: AddView())
        )
    }
    func deleteItem(indexSet: IndexSet) {
        items.remove(atOffsets: indexSet)
    }
}


struct ListView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ListView()
        }
    }
}

