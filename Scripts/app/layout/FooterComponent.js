import React,{Component} from 'react';

export default class FooterComponent extends Component {
    render() {
        return <footer id="footer">
            <div className="copyright">
                &copy; ArthurChang Design: <a href="https://github.com/ArthurChang01/React-Redux-Practice">Arthur GitHub</a>.
            </div>
        </footer>;
    }
}