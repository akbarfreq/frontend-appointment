import React, {memo} from 'react'
import classNames from 'classnames'
import SideBarHeader from './SideBarHeader'
import SideBarItem from './SideBarItem'
import {CScrollbar} from "@frontend-appointment/ui-elements";


const CSideBar = props => {
    // console.log(props.isOpen);
    return (

        <div
            id="sidebar-wrapper"
            className={classNames(
                'sidebar',
                {'is-open': props.isOpen},
                {'is-sidehover': props.isHover && !props.isOpen},
                {'is-close': !props.isOpen && !props.isHover}
            )}
            style={
                props.isOpen || props.isHover
                    ? {
                        height: props.height,
                        overflowY: props.overflow
                    }
                    : {height: props.height}
            }
            onMouseOver={props.onHoverSideBar}
            onMouseLeave={props.onLeaveHover}
        >
            <CScrollbar id="sidebar-scrollbar">
                <SideBarHeader
                    header="cogentEMR"
                    toggle={props.toggle}
                    isOpen={props.isOpen}
                    isHover={props.isHover}
                />

                <SideBarItem
                    trees={props.trees}
                    isOpen={props.isOpen}
                    heading="heading"
                    isHover={props.isHover}
                    localFunc={props.localFunc}
                    activeStateKey={props.activeStateKey}
                    hasTab={props.hasTab}
                />
            </CScrollbar>
        </div>

    )
}

CSideBar.defaultProps = {
    overflow: 'auto'
}
export default memo(CSideBar)
