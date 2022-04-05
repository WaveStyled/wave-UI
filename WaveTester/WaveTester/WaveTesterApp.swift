//
//  WaveTesterApp.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/3/22.
//

import SwiftUI

@main
struct WaveTesterApp: App {
    
    @StateObject var listViewModel:ListViewModel = ListViewModel()
    
    var body: some Scene {
        WindowGroup {
            NavigationView {
                ListView()
            }
            .environmentObject(listViewModel)
        }
    }
}
