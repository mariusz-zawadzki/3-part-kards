import React, {Component} from 'react';


class FileUpload extends Component {

    render() {
        const upload = () => {
            let input = this.fileInput;
            let that = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    that.props.updateUrl(e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
                this.value=null;
            }
            else {
                console.log("Sorry - you're browser doesn't support the FileReader API");
            }
        };
        return (
            <form>
            <div className="form-group">
                <label className="btn btn-secondary">Kliknij by wybrać plik.
                    <input ref={(input) => {this.fileInput = input;}}
                           type="file"
                           className="d-none"
                           onChange={(e) => upload(this)}
                           onClick={(e) => {this.value = null}}
                           multiple={this.props.multiple || false}
                    />
                </label>
            </div>
            </form>
        )
    }
}

/**
 *
 To set up the editor integration, add something like REACT_EDITOR=atom to the .env.local file in your project folder and restart the development server. Learn more: https://goo.gl/MMTaZt


 */

export default FileUpload;
