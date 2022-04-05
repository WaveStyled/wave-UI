//
//  ListViewModel.swift
//  WaveTester
//
//  Created by Griffen Shu on 4/4/22.
//

import Foundation

class ListViewModel:ObservableObject {
    @Published var items: [ItemModel] = []
    
    init() {
        getItems()
    }
    func getItems(){
        let newItems = [
            ItemModel(name: "Nike Sweatpants", type: "SWTP", warnRecent: true),
            ItemModel(name: "Bape Hoodie", type: "HOOT", warnRecent: false),
            ItemModel(name: "Adidas T-shirt", type: "STES", warnRecent: true)
          ]
        items.append(contentsOf: newItems)
    }
    
    func deleteItem(indexSet: IndexSet) {
        items.remove(atOffsets: indexSet)
    }
    
    func addItem(title: String) {
        let newItem = ItemModel(name: title, type: "STES", warnRecent: false)
        items.append(newItem)
    }
    
    func getWardrobe() {
        guard let url = URL(string: "http://localhost:5001/wardrobe") else {
            fatalError("Invalid GET URL")
        }
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check if Error took place
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Read HTTP Response Status code
            if let response = response as? HTTPURLResponse {
                print("Response HTTP Status code: \(response.statusCode)")
            }
            
            // Convert HTTP Response Data to a simple String
            if let data = data, let dataString = String(data: data, encoding: .utf8) {
                print("Response data string:\n \(dataString)")
            }
            
        }
        task.resume()
    }

}
