import React, {memo} from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import PropTypes from 'prop-types';

const CToggle = props => {

    const handleChange = (value) => {
        props.onChangeHandler({
            target: {
                value: value,
                name: props.name,
            }
        })
    };
    const {
        id, onLabel, offLabel,
        size, onStyle, offStyle,
        width, height, name,
        onChangeHandler, classes, required,
        checked, style, reference, defaultChecked, disabled
    } = props;
    return (
        <>
            <BootstrapSwitchButton
                ref={reference}
                id={id}
                onlabel={onLabel}
                offlabel={offLabel}
                size={size}
                onstyle={onStyle}
                offstyle={offStyle}
                style={style}
                width={width}
                height={height}
                className={classes}
                onChange={handleChange}
                name={name}
                checked={checked}
                required={required}
                defaultChecked={defaultChecked}
                disabled={disabled}
            />
        </>
    )
};

export default memo(CToggle);

CToggle.defaultProps = {
    id: "c-toggle",
    name: "c-toggle",
    onChangeHandler: () => {
    },
    checked: false,
};

CToggle.propTypes = {
    id: PropTypes.string || PropTypes.number,
    name: PropTypes.string.isRequired,
    onLabel: PropTypes.string || PropTypes.element,
    offLabel: PropTypes.string || PropTypes.element,
    size: PropTypes.number,
    onStyle: PropTypes.string,
    offStyle: PropTypes.string,
    style: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool
}
