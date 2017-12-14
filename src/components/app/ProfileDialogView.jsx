import React from 'react';
import 'bootstrap/dist/js/bootstrap.min';
import * as PropTypes from "prop-types";
import noProfileImg from '../../../static/assets/no-profile.png';

class ProfileDialogView extends React.Component{
    static propTypes = {
        currentUser: PropTypes.any.isRequired,
        onSaveProfile: PropTypes.func.isRequired
    }

    closeButton = null;

    constructor(props){
        super(props);
        this.state = { imgFile: '', imagePreviewUrl: this.props.currentUser.pictureUrl, nickname: this.props.currentUser.nickname};
        this._handleSaveProfile = this._handleSaveProfile.bind(this);
        this._updateState = this._updateState.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imageFile: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    _updateState(props)
    {
        this.setState(
            {
                imageFile: '',
                imagePreviewUrl: props.currentUser.pictureUrl,
                nickname: props.currentUser.nickname
            }
        );
    }

    componentWillReceiveProps(nextProps)
    {
        this._updateState(nextProps);
    }

    _handleSaveProfile(){
        this.props.onSaveProfile({ userId: this.props.currentUser.id, nickname: this.state.nickname, imageFile: this.state.imageFile });
        this.closeButton.click();
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<img src={noProfileImg} />);
        }
        return <div>
            <div className="modal fade" id="profileDialog" tabIndex="-1" role="dialog" aria-labelledby="profileDialogLabel" aria-hidden="true" data-backdrop="static"
            forceupdate={this.props.currentUser.id}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="profileDialogLabel">Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this._updateState(this.props)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="imgPreview">
                                            {$imagePreview}
                                        </div>
                                        <input className="fileInput"
                                               type="file"
                                               onChange={(e)=>this._handleImageChange(e)} />
                                    </div>
                                    <div className="col-6">
                                        <span>Nickname:</span>
                                        <input type="text" value={this.state.nickname} onChange={(e) => this.setState({nickname: e.target.value})} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button ref={e => this.closeButton = e} type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this._updateState(this.props)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this._handleSaveProfile}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

    }
}

export { ProfileDialogView };