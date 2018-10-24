//
//  ScreenCtrl.swift
//  futures
//
//  Created by zol on 2018/1/19.
//  Copyright © 2018年 Zol. All rights reserved.
//

import UIKit
import React

@objc(ScreenCtrl)

class ScreenCtrl: NSObject {
    @objc(rotateScreen:)
    
    func rotateScreen(type: String){
        DispatchQueue.main.async {
            
            let appDelegate = UIApplication.shared.delegate as! AppDelegate
            
            switch type {
            case "PORTRAIT":
                appDelegate.blockRotation = false
                UIDevice.current.setValue(UIInterfaceOrientation.portrait.rawValue, forKey: "orientation")

            case "LANDSCAPE":
                appDelegate.blockRotation = true
                UIDevice.current.setValue(UIInterfaceOrientation.landscapeLeft.rawValue, forKey: "orientation")
            default:
                break
            }
            
        }
    }
    
    @objc(getOrientation:)
    
    func getOrientation(callback: RCTResponseSenderBlock) {
        switch UIDevice.current.orientation {
        case .portrait:
            callback(["PORTRAIT"])
        case .landscapeLeft, .landscapeRight:
            callback(["LANDSCAPE"])
        default:
            callback(["error"])
            break
        }
    }
    
}
