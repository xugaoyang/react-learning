import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    setIsSettingOpen,
    setStyleSetting,
    resetstyleSetting
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
    const { layoutStyle, themeColor, headerColor, sideColor } = styleSetting
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
        }
    ]


    const resetHandle = () => {
        dispatch(resetstyleSetting());
    }
    const saveHandle = () => { }

    return (
        <>
            <Drawer
                title="风格配置"
                onClose={onClose}
                open={isSettingOpen}
                className="setting-panel"
                footer={(
                    <div className='flex justify-center'>
                        <Button type="primary" danger className="mr-[20px]" onClick={resetHandle}>重置</Button>
                        <Button type="primary" onClick={saveHandle}>保存</Button>
                    </div>
                )}

            >
                <p>layoutStyle:{layoutStyle}</p>
                <p>themeColor:{themeColor}</p>
                <p>headerColor:{headerColor}</p>
                <p>sideColor:{sideColor}</p>
                <Form
                    labelAlign="right"
                    labelCol={{ span: 8 }}
                >
                    <Form.Item
                        label="布局"
                    >
                        <Radio.Group
                            onChange={handleLayoutChange}
                            value={layoutStyle}
                            options={layoutOptions}>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="主题色"
                    >
                        <ColorPicker
                            value={themeColor}
                            onChange={handleThemeColorChange}
                            showText
                        />
                    </Form.Item>
                    <Form.Item
                        label="头部背景"
                    >
                        <ColorPicker
                            value={headerColor}
                            onChange={handleHeaderColorChange}
                            showText
                        />
                    </Form.Item>
                    <Form.Item
                        label="菜单背景"
                    >
                        <ColorPicker
                            value={sideColor}
                            onChange={handleSideColorChange}
                            showText
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default Setting;