//
//  ListRowView.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/3/22.
//

import SwiftUI

struct ListRowView: View {
    
    let item: ItemModel
    
    var body: some View {
        HStack {
            Image(systemName: item.warnRecent ? "checkmark.circle": "circle")
                .foregroundColor(item.warnRecent ? .red : .green)
            Text(item.name)
            Spacer()
        }.font(.title2)
            .padding(.vertical, 8)
    }
}

struct ListRowView_Previews: PreviewProvider {
    
    static var item1 = ItemModel(name: "Nike Sweatpants", type: "SWTP", warnRecent: true)
    static var item2 = ItemModel(name: "Bape Hoodie", type: "HOOT", warnRecent: false)
    
    static var previews: some View {
        Group {
            ListRowView(item: item1)
            ListRowView(item: item2)
        }
    }
}
