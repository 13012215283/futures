//
//  TCGlobalVariable.swift
//  futures
//
//  Created by zol on 2017/12/18.
//  Copyright © 2017年 Zol. All rights reserved.
//

import UIKit
import CodePush
//MARK - 固定边
let TC_Interval : CGFloat = 12.0

//MARK - 屏幕宽高
let TC_ScreenWidth  = UIScreen.main.bounds.width
let TC_ScreenHeight = UIScreen.main.bounds.height


//MARK - react-native bundleURL , moduleName
#if DEBUG
    let TC_BundleURL  = URL(string: "http://192.168.11.157:8081/index.bundle?platform=ios")
#else
    let TC_BundleURL  = CodePush.bundleURL(forResource: "index.ios", withExtension: "bundle", subdirectory: "Assets/ReactResources/")
#endif



let TC_ModuleName = "futures"

/// 是否是线上
//let TC_IsOnline = true


