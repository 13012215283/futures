//
//  TCAppCenterManager.swift
//  futures
//
//  Created by zol on 2018/1/31.
//  Copyright © 2018年 Zol. All rights reserved.
//

import UIKit
import AppCenter
import AppCenterAnalytics
import AppCenterCrashes

class TCAppCenterManager: NSObject {

    class func startServices() {
        MSAppCenter.start("56f919e8-f971-4516-a768-4bd5c6b2e42e", withServices: [MSAnalytics.self, MSCrashes.self])
    }
    
}
