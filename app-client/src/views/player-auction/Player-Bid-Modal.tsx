import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '../components/Button';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.secondary.light,
    border: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  labelProps: {
    color: 'black',
  },
  searchBar: {
    padding: '0',
  },
  marginRight: {
    marginRight: '5px',
  },
  modal: {
    margin: '20% 30% 25% 30%',
    background: 'white',
    height: '20%',
    outline: 'none',
  },
  innerModal: {
    padding: '2rem',
  },
  bigInput: {
    paddingBottom: '5px',
  },
  placeBidButton: {
    float: 'right',
  },
}));

interface ModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const PlayerBidModal: React.FC<ModalProps> = (props: ModalProps) => {
  const classes = useStyles();
  const { setOpen, open } = props;
  const [bid, setBid] = useState<string>('');

  const getDetailsOnClick = () => {
    console.log('details');
  };

  const handleModalClose = (): void => {
    setOpen(false);
  };

  const inputBidHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { target: { value } } = event;
    setBid(value);
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
    >
      <div className={classes.modal}>
        <div className={classes.innerModal}>
          <TextField
            onChange={inputBidHandler}
            id="standard-number"
            label="Bid"
            type="number"
            fullWidth
            variant="outlined"
            value={bid}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.bigInput}
          />
          <div>
            <Button text="Cancel" clickHandler={getDetailsOnClick} smallButtonCancel />
            <Button text="Place Bid" clickHandler={getDetailsOnClick} smallButtonSecondary className={classes.placeBidButton} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerBidModal;
