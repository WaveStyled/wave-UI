//
//  ItemModel.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/4/22.
//

import Foundation

struct ItemModel: Identifiable {
    let id:String = UUID().uuidString
    let name: String
    let type: String
    let warnRecent: Bool
    
    
}
