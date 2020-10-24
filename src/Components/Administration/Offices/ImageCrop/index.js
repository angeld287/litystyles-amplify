import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import {Button} from 'react-bootstrap'
//import { withStyles } from '@material-ui/core/styles'
import getCroppedImg from '../../../../commun/cropImage'
import { styles } from './styles'



const ImageCrop = ({ _crop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const dogImg = _crop.imagePath;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      _crop.setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  return (
    <div>
      <div style={{position: 'relative', width: '100%', height: 200, background: '#333'}}>
        <Cropper
          image={dogImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div >
        <Button style={{marginLeft: 16, flexShrink: 0}} onClick={showCroppedImage}>
          Show Result
        </Button>
      </div>
    </div>
  )
}

export default ImageCrop;
