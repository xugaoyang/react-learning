import { useState } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    setIsSettingOpen,
    setStyleSetting,
} from '@/store/modules/setting';
import type { styleSettingType } from '@/types/setting';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Radio, ColorPicker } from 'antd';
import type { RadioChangeEvent } from 'antd';
import layoutWithoutSideImg from '@/assets/layoutWithoutSide.svg'
import layoutWithSideImg from '@/assets/layoutWithSide.svg'
import './setting.scss'

function Setting() {
    const dispatch = useDispatch();
    const { isSettingOpen, styleSetting } = useSelector(
        (state: any) => state.setting,
    );
    console.log('styleSetting', styleSetting)
    const onClose = () => {
        dispatch(setIsSettingOpen(false))
    };

    const handleLayoutChange = (e: RadioChangeEvent) => {
        dispatch(setStyleSetting({ layoutStyle: e.target.value }));
    };

    const handleThemeColorChange = (color: any) => {
        dispatch(setStyleSetting({ themeColor: color.toHexString() }));
    };

    const handleHeaderColorChange = (color: any) => {
        dispatch(setStyleSetting({ headerColor: color.toHexString() }));
    };

    const handleSideColorChange = (color: any) => {
        dispatch(setStyleSetting({ sideColor: color.toHexString() }));
    };

    const layoutOptions = [
        {
            value: 'withSide',
            label: (<img className="w-[50px] h-[50px]" src={layoutWithSideImg} />)
        },
        {
            value: 'withoutSide',
            label: (<img className="w-[50px] h-[50px]" src={layoutWithoutSideImg} />)
        },
    ]

    return (
        <>
            <Drawer
                title="设置面板"
                onClose={onClose}
                open={isSettingOpen}
                className="setting-panel"

            >
                <Form
                    labelAlign="right"
                    labelCol={{ span: 8 }}
                >
                    <Form.Item
                        label="布局"
                        name="layout"
                    >
                        <Radio.Group
                            onChange={handleLayoutChange}
                            value={styleSetting.layoutStyle}
                            options={layoutOptions}>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="主题色"
                        name="themeColor"
                    >
                        <ColorPicker 
                            defaultValue={styleSetting.themeColor} 
                            onChange={handleThemeColorChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="头部背景"
                        name="headerColor"
                    >
                        <ColorPicker 
                            defaultValue={styleSetting.headerColor} 
                            onChange={handleHeaderColorChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="菜单背景"
                        name="sideColor"
                    >
                        <ColorPicker 
                            defaultValue={styleSetting.sideColor} 
                            onChange={handleSideColorChange}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default Setting;