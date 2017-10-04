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
            <label className="custom-file">
                <input ref={(input) => {this.fileInput = input;}} 
                type="file"
                className="custom-file-input"
                onChange={(e) => upload(this)}
                onClick={(e) => {this.value = null}} />
                <span className="custom-file-control"></span>
            </label>
            </div>
            </form>
        )
    }
}

export default FileUpload;
