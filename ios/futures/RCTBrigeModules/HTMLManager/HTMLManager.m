//
//  HTMLManager.m
//  futures
//
//  Created by zol on 2018/1/19.
//  Copyright © 2018年 Zol. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(HTMLManager, NSObject)

RCT_EXTERN_METHOD(getHTMLPath:(NSString *)name callback:(RCTResponseSenderBlock)callback)

@end
