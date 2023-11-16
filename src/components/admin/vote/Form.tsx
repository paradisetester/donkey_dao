  import React, { useState, forwardRef } from "react";
  import MyAlgoConnect from "@randlabs/myalgo-connect";
  import DatePicker from "react-datepicker";
  import moment from "moment";

  import "react-datepicker/dist/react-datepicker.css";

  import { Form, Button, Alert } from "react-bootstrap-v5";
  import { VoteFormFields } from "./questionType";
  import { algodClient } from "../../../utils/connections";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { VoteFormProps, Errors } from "./questionType";
  import { RootState } from "../../../../src/rootReducer";
  import MyAlgoWallet from "../../MyAlgoWallet/MyAlgoWallet";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";

  const algosdk = require("algosdk");

  const VoteForm: React.FunctionComponent<VoteFormProps> = ({
    voteId = 0,
    vote = {
      question: "",
      status: 1,
      asset_name: "",
      asset_id: 0,
      unit_name: "",
      total_supply: "",
      vote_end_date: new Date(),
      asset_txn: "",
      vote_create_addres:"",
    },
  }) => {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formDiabled, setFormDiabled] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState<VoteFormFields>(vote);
    const [show, setShow] = useState<boolean>(true);

    let address = useSelector((state: RootState) => {
      return state.walletReducer["address"];
    });


    const waitForConfirmation = async function (txId: string) {
      let response = await algodClient.status().do();
      let lastround = response["last-round"];
      while (true) {
        const pendingInfo = await algodClient
          .pendingTransactionInformation(txId)
          .do();
        if (
          pendingInfo["confirmed-round"] !== null &&
          pendingInfo["confirmed-round"] > 0
        ) {
          //Got the completed Transaction
          console.log(
            "Transaction " +
            txId +
            " confirmed in round " +
            pendingInfo["confirmed-round"]
          );
          break;
        }
        lastround++;
      }
    };


    const handleSubmit = async () => {
      setErrors({});
      setIsLoading(true);
      setFormDiabled(true)

      try {
        if (voteId) {
          console.log("Edit Form");
          console.log(voteId);
        } else {
          const response = await CreateAsset();
          console.log("Information for Asset create response : " + JSON.stringify(response, undefined, 2));
          if (response) {
            formData.asset_txn = response.txId;
            await waitForConfirmation(response.txId);
            // Get the new asset's information from the creator account
            let ptx = await algodClient.pendingTransactionInformation(response.txId).do();
            if (ptx) {
              formData.asset_id = ptx["asset-index"];
              formData.vote_create_addres = address;
              formData.status = 2;

              await QuesCreate(formData, setErrors);
            } else {
              setIsLoading(false);
              console.log("Data not submitted in the database!")
            }
          } else {
            setIsLoading(false);
          }
        }
      } catch (error:any) {
        console.log(error)
        alert(error.message.transaction)
        console.log( JSON.stringify(error.transaction, undefined,4));

        setIsLoading(false);
      }
    };

    async function CreateAsset() {
      const params = await algodClient.getTransactionParams().do();
      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: address,
        total: BigInt(formData.total_supply),
        assetName: formData.asset_name,
        unitName: formData.unit_name,
        assetURL: "http://someurl",
        assetMetadataHash: "16efaa3924a6fd9d3a4824799a4ac65d",
        defaultFrozen: false,
        note: undefined,
        freeze: address,
        manager: address,
        clawback: address,
        reserve: address,
        suggestedParams: params,
        closeRemainderTo: undefined,
        revocationTarget:undefined,
      });
      const myAlgoWallet = new MyAlgoConnect();
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();



      return response;


    }

    async function QuesCreate(
      request_data: any,
      setErrors: React.Dispatch<React.SetStateAction<Errors>>
    ) {
      request_data.vote_end_date = moment(request_data.vote_end_date).format(
        "YYYY-MM-DD"
      );
   
      const obj = new MainApiProtectedVersion('');
      const response = await obj.requstCreateVote(request_data);
      if (response) {       
        navigate(`/admin/vote`);
      } else {
        alert("Data not submitted in the database!")
        console.log("Data not submitted in the database!");
      }
      setIsLoading(false);
    }

    function AlertDismissibleExample() {
      if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{errors.title}</Alert.Heading>
            <p>{errors.message}</p>
          </Alert>
        );
      }
      return <></>;
    }

    const CustomInput = forwardRef((props: any, ref: any) => {
      return <Form.Control required ref={ref} {...props} />;
    });

    return (
      <>
        <Form
          validated={validated}
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              handleSubmit();
            }

            setValidated(true);
          }}
          className="admin_form"
        >
          {errors.message && <AlertDismissibleExample />}
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Question Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={formData.question}
              name="question"
              onChange={(event) => {
                if(formDiabled) return;
                const { name, value } = event.target;
                setFormData({ ...formData, [name]: value });
              }}
              disabled={formDiabled}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Asset name"
              value={formData.asset_name}
              name="asset_name"
              onChange={(event) => {
                if(formDiabled) return;
                const { name, value } = event.target;
                setFormData({ ...formData, [name]: value });
              }}
              disabled={formDiabled}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}> */}

          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Unit Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Unit name"
              value={formData.unit_name}
              name="unit_name"
              onChange={(event) => {
                if(formDiabled) return;
                const { name, value } = event.target;
                setFormData({ ...formData, [name]: value });
              }}
              disabled={formDiabled}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Total Supply</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Total Supply"
              value={formData.total_supply}
              name="total_supply"
              onChange={(event) => {
                if(formDiabled) return;
                const { name, value } = event.target;
                setFormData({ ...formData, [name]: value });
              }}
              disabled={formDiabled}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Vote End</Form.Label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={formData.vote_end_date}
              customInput={<CustomInput />}
              onChange={(date: Date) => {
                if(formDiabled) return;
                setFormData({ ...formData, vote_end_date: date });
              }}
              disabled={formDiabled}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <div className="text-center">
            {address ? (
              isLoading ? (
                <Button type="button" className="cstm_btn">
                  Loading...
                </Button>
              ) : (
                <Button type="submit" className="cstm_btn">
                  {voteId ? "Update" : "Add Vote"}
                </Button>
              )
            ) : (
              <div className="text-center">
                <MyAlgoWallet className="cstm_btn"/>
              </div>
            )}
          </div>
        </Form>

      </>
    );
  };

  export default VoteForm;
