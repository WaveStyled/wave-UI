//
//  ListView.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/3/22.
//

import SwiftUI

struct ListView: View {
    
    @EnvironmentObject var listViewModel:ListViewModel
    
    var body: some View {
        List {
            ForEach(listViewModel.items) {
                item in
                ListRowView(item: item)
                //ListRowView(title: item)
            }.onDelete(perform: listViewModel.deleteItem)
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
        .environmentObject(ListViewModel())
    }
}

