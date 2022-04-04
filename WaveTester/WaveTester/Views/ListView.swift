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
            ListRowView(title: "First item")
        }
        .navigationTitle("Wordrobe 👔")
    }
}

struct ListView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ListView()
        }
    }
}

