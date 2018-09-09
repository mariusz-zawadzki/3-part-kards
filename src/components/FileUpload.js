import React, {Component} from 'react';
import _ from 'lodash'

class FileUpload extends Component {

    readUploadedFileAsDataUrl(inputFile) {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {
                const lastDot = inputFile.name.lastIndexOf('.');
                let fileName = inputFile.name.substring(0, lastDot);
                let result = {data: temporaryFileReader.result, title: fileName};
                console.log("Success", result);
                resolve(result);
            };
            temporaryFileReader.readAsDataURL(inputFile);
        });
    };

    render() {
        const upload = () => {
            let input = this.fileInput;
            let that = this;
            if (input.files && input.files[0]) {
                if(this.props.multiple){
                    Promise.all(
                        _.map(input.files,this.readUploadedFileAsDataUrl)
                    ).then((results)=>{
                        this.props.updateUrl(results);
                    })
                }
                else
                {
                    this.readUploadedFileAsDataUrl(input.files[0])
                        .then((result)=>{
                            that.props.updateUrl(result);
                        });
                }
                this.value=null;
            }
            else {
                console.log("Sorry - you're browser doesn't support the FileReader API");
            }
        };

        let label = this.props.label || "Kliknij by wybrać plik."

        return (
            <form>
            <div className="form-group">
                <label className="btn btn-secondary">
                    {label}
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
