//
//  ScreenCtrlTests.swift
//  futuresTests
//
//  Created by zol on 2018/1/20.
//  Copyright © 2018年 Zol. All rights reserved.
//

import XCTest
@testable import futures
class ScreenCtrlTests: XCTestCase {
    
    let ctrl = ScreenCtrl()
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testRotateScreen() {
        
        ctrl.rotateScreen(type: "LANDSCAPE")
        DispatchQueue.main.async {
            XCTAssertTrue(UIDevice.current.orientation == .landscapeRight || UIDevice.current.orientation == .landscapeLeft, "参数正确,屏幕切换失败")
        }
        
        ctrl.rotateScreen(type: "PORTRAIT")
        DispatchQueue.main.async {
            XCTAssertTrue(UIDevice.current.orientation == .portrait, "参数正确,屏幕切换失败")
        }
        
        ctrl.rotateScreen(type: "")
        DispatchQueue.main.async {
            XCTAssertTrue(UIDevice.current.orientation == .portrait, "参数错误,屏幕不应切换")
        }
        
        ctrl.rotateScreen(type: "LANDSCAPE")
        ctrl.rotateScreen(type: "")
        DispatchQueue.main.async {
            XCTAssertTrue(UIDevice.current.orientation == .landscapeRight || UIDevice.current.orientation == .landscapeLeft, "参数错误,屏幕不应切换")
        }
        
    }
    
    func testGetOrientation() {
        ctrl.rotateScreen(type: "PORTRAIT")
        DispatchQueue.main.async {
            self.ctrl.getOrientation(callback: { (results) in
                self.chekOrientationResult(results)
                let orientation : String = results![0] as! String
                XCTAssertTrue(orientation == "PORTRAIT")
            })
        }
        
        ctrl.rotateScreen(type: "LANDSCAPE")
        DispatchQueue.main.async {
            self.ctrl.getOrientation(callback: { (results) in
                self.chekOrientationResult(results)
                let orientation : String = results![0] as! String
                XCTAssertTrue(orientation == "LANDSCAPE")
            })
        }
        
        DispatchQueue.main.async {
            UIDevice.current.setValue(UIInterfaceOrientation.portraitUpsideDown.rawValue, forKey: "orientation")
            self.ctrl.getOrientation(callback: { (results) in
                self.chekOrientationResult(results)
                let orientation : String = results![0] as! String
                XCTAssertTrue(orientation == "error")
            })
        }
        
        
    }
    
    func chekOrientationResult(_ results: [Any]?) {
        XCTAssertNotNil(results, "返回结果为空")
        
        if let results = results {
            XCTAssertTrue(results.count == 1, "数组中的值数量不对")

            let orientation = results[0]
            XCTAssertTrue(orientation is String, "返回类型错误")
        }
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
}
