import Style from "styled-components"

export const NAVBAR = Style.div`
    padding:initial;
    @media (max-width: 1360px) {
        justify-content:center;
        .left-sidebar{
            display:none;
        }
    }
    @media (max-width: 920px) {
        justify-content:center;
        .navbar-sub-1,.navbar-sub-2{
            display:none;
        }
        .navbar-sub-btn{
            display:initial;
        }    
        .change1 {
           justify-content:space-between;
        }
        .nav-sub-11,.nav-sub-12{
            display:initial;
        }
        .nav-sub-main{
            width:100%;
            display:flex;
            justify-content:space-between;
        }
        .nav-sub{
            width:80%;
            justify-content:space-between;
        }
        
    }
    @media (max-width: 750px) {
        
        .nav-sub{
            width:80%;
            flex-direction:column;
            justify-content:space-between;
        }
    }
    @media (max-width: 700px) {
        .navbar-menu-btn button{
            display:initial;
        }
        .left-sidebar{
            display:initial;
        }
    }
`

export const LEFTBAR = Style.div.attrs(props =>({
    height: props.height || "100%"
}))`
    @media (max-width: 700px) {
        &.left-nav{
            display:none;
        }
        &.left-sidebar{
            position: absolute;
            height: ${props => props.height};
            background-color: white;
        }
    }
`

export const HOME2 = Style.div`
    @media (max-width: 1366px) {
        width:calc(100% - 164px);
    }
    @media (max-width: 700px) {
        width:100%;
    }
`

export const DisplayQuestion = Style.div`
    @media (max-width: 1366px) {
        display:flex;
    }
    @media (max-width: 700px) {
        display:none;
    }
`

export const SUBSCRIPTIONPLAN = Style.div`
    @media (max-width: 1100px) {
        .subscription-plan{
            padding:35px 15px;
            width:25%;
        }
    }
    @media (max-width: 950px) {
        .subscription-plan{
            padding:30px 10px;
            width:30%;
        }
    }
    @media (max-width: 800px) {
        .subscription-plan{
            padding:25px 0px;
            width:32%;
        }
    }
    @media (max-width: 700px) {
        flex-direction:column;
        .subscription-plan{
            margin:20px;
            padding:25px 0px;
            width:50%;
        }
    }
    @media (max-width: 700px) {
        flex-direction:column;
        .subscription-plan{
            margin:20px;
            padding:25px 10px;
            width:65%;
        }
    }

`