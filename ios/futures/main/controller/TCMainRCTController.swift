//
//  TCMainRCTController.swift
//  futures
//
//  Created by zol on 2017/12/18.
//  Copyright © 2017年 Zol. All rights reserved.
//

import UIKit
import React
import SnapKit

class TCMainRCTController: UIViewController {
    // MARK: - 私有属性
    fileprivate var reactView : RCTRootView
    
    
    // MARK: - 构造方法
    init(bundleURL : URL?, moduleName : String, properties : [AnyHashable : Any]?,launchOptions : [AnyHashable : Any]?) {
    
        reactView = RCTRootView(bundleURL: bundleURL, moduleName: moduleName, initialProperties: properties, launchOptions: launchOptions)
        
        super.init(nibName: nil, bundle: nil)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: - 生命周期
    override func viewDidLoad() {
        
        super.viewDidLoad()
        setupNavi()
        setupUI()
        
    }
    
    // MARK: - 设置UI和Navi
    fileprivate func setupNavi() {
        navigationController?.navigationBar.isTranslucent = false
        navigationController?.navigationBar.isHidden = true
    }
    
    fileprivate func setupUI() {
        
        view.backgroundColor = UIColor.white
        view.addSubview(reactView)
        layout()
        
    }
    
    
    // MARK: - 布局
    fileprivate func layout() {
        
        reactView.snp.makeConstraints { (make) in
            make.edges.equalTo(view)
        }
        
    }
    
}
