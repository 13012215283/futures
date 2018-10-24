//
//  HTMLManager.swift
//  futures
//
//  Created by zol on 2018/1/19.
//  Copyright © 2018年 Zol. All rights reserved.
//

import UIKit
import React
@objc(HTMLManager)
class HTMLManager: NSObject {
    
    
    
    @objc(getHTMLPath:callback:)
    func getHTMLPath(name: String, callback: RCTResponseSenderBlock){
        let htmlPath = "Assets/HTMLResources/candlestickChart/"
        if let htmlPath = Bundle.main.path(forResource: htmlPath + name, ofType: "html") {
            callback([NSNull(),htmlPath])
            return
        }
        callback(["no fonud", NSNull()])
        
    }
}
