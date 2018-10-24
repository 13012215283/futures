//
//  HTMLManagerTests.swift
//  futuresTests
//
//  Created by zol on 2018/1/20.
//  Copyright © 2018年 Zol. All rights reserved.
//

import XCTest
@testable import futures
class HTMLManagerTests: XCTestCase {
    
    let manager = HTMLManager()
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
   
    func testGetHTMLPath() {
        
        manager.getHTMLPath(name: "tendency") { (results) in
            checkResults(results: results)
        }
        
        manager.getHTMLPath(name: "faehufhdfeafdgjeiagjdgjeai") { (results) in
            checkResults(results: results)
            if let results = results {
                XCTAssertTrue(results[1] is NSNull, "不应该查找到结果")
            }
        }
        
        manager.getHTMLPath(name: "") { (results) in
            checkResults(results: results)
            if let results = results {
                XCTAssertTrue(results[1] is NSNull, "不应该查找到结果")
            }
           
            
        }
    }
    
    ///测试返回结果的格式和类型
    func checkResults(results: [Any]?) {
        XCTAssertNotNil(results, "返回结果为空")
        
        if let results = results {
            XCTAssertTrue(results.count == 2, "数组中的值数量不对")
            
            let err = results[0]
            let htmlPath = results[1]
            
            XCTAssertTrue(err is NSNull || err is String, "返回error类型错误")
            XCTAssertTrue(htmlPath is NSNull || htmlPath is String, "返回地址错误")
        }
        
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
    
    
}
