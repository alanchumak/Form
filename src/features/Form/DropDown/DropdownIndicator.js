import React, { useEffect, useRef, useState } from 'react';
import  { components } from 'react-select';
import { ArrowClosed, ArrowOpen } from '../OpenCloseArrows';


export const DropdownIndicator = props => {
    const { menuIsOpen } = props.selectProps;
    const arrow = menuIsOpen ? <ArrowOpen /> : <ArrowClosed />;
    return (
        <components.DropdownIndicator {...props}>
            {arrow}
        </components.DropdownIndicator>
    );
};