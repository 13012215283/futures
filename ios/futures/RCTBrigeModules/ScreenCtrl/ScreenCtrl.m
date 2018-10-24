//
//  ScreenCtrl.m
//  futures
//
//  Created by zol on 2018/1/19.
//  Copyright © 2018年 Zol. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScreenCtrl, NSObject)

RCT_EXTERN_METHOD(getOrientation:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(rotateScreen:(NSString *)type)

- (NSDictionary *)constantsToExport {
    return @{ @"PORTRAIT": @"PORTRAIT",@"LANDSCAPE": @"LANDSCAPE" };
}

@end
