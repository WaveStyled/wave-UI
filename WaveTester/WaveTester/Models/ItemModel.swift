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
struct Clothes: Identifiable {
    let id:Int
    let R_COLOR:Int
    let G_COLOR:Int
    let B_COLOR:Int
    let TYPE:String
    let RECENT_DATE_WORN:String
    let TIMES_WORN:Int
    let RATING:Int
    let OC_FORMAL:Int
    let OC_SEMI_FORMAL:Int
    let OC_CASUAL:Int
    let OC_WORKOUT:Int
    let OC_OUTDOORS:Int
    let OC_COMFY:Int
    let WE_COLD:Int
    let WE_HOT:Int
    let WE_RAINY:Int
    let WE_SNOWY:Int
    let WE_AVG_TMP:Int
    
}

