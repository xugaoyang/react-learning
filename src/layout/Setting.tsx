import { useState } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    setIsSettingOpen,
} from '@/store/modules/setting';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import layoutWithoutSideImg from '@/assets/layoutWithoutSide.svg'
import layoutWithSideImg from '@/assets/layoutWithSide.svg'
import './setting.scss'

function Setting() {
    const [layoutValue, setLayoutValue] = useState('withSide');
    const onChange = (e: RadioChangeEvent) => {
        console.log(e.target.value)
        setLayoutValue(e.target.value);
    };
    const dispatch = useDispatch();
    const { isSettingOpen } = useSelector(
        (state: any) => state.setting,
    );

    const onClose = () => {
        dispatch(setIsSettingOpen(false))
    };
    const layoutOptions = [
        {
            value: 'withSide',
            className: 'layout-img',
            label: (<img className="w-[50px] h-[50px]" src={layoutWithSideImg} />)
        },
        {
            value: 'withoutSide',
            className: 'layout-img',
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
                <Form>
                    <Form.Item
                        label="布局"
                        name="layout"
                    >
                        <Radio.Group
                            onChange={onChange}
                            value={layoutValue}
                            options={layoutOptions}>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default Setting;