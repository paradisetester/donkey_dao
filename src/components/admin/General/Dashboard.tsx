import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Button, Form } from "react-bootstrap-v5";
import { Input, Label } from "reactstrap";
import { MainApiProtectedVersion } from "../../../utils/axios/requests";
import { GeneralSetting } from "../../../utils/axios/types";

export interface FormProps {
    setting?: GeneralSetting;
}
const SettingDashboard: React.FunctionComponent<FormProps> = ({
    setting = {
        id: 1,
        user: 3,
        privatekey: "",
        mnemonic: "",
        testapi: "",
        mainapi: "",
        beatapi: "",
        addre: "",


    }
}) => {

    const [isSetting, setSetting] = useState();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<GeneralSetting>(setting);
    const [formDiabled, setFormDiabled] = useState(false);


    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const obj = new MainApiProtectedVersion('',1);
                const response = await obj.requstSettingID();
                console.log("updarudpate value responset" ,response.data.data)
                if (response) { 
                    setFormData(response.data.data)
                }
                setIsLoading(false);

            } catch (error) {
                console.log(error);
                // setIsLoading(false);
            }
        };

        getData();
    }, []);

    const handleSubmit = async () => {
        try {
            const id = 1
            const body={
                    id: 1,
                    privatekey:formData.privatekey ,
                    mnemonic:formData.mnemonic,
                    testapi: formData.testapi,
                    mainapi: formData.mainapi,
                    beatapi: formData.beatapi,
                    addre: formData.addre,
                    user: 3

            }
            console.log()
            const obj = new MainApiProtectedVersion('', id);
            const response = await obj.requstUpdateSetting(body);
            console.log("updat" ,response)
            if (response) {
                setFormData(response.data.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            // setIsLoading(false);
        }

        console.log('fdsfsdfsdfsdf')
    }

    return (
        <>
            <h2 className="sec_title wow fadeInDown">Set Up   </h2>
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
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Test Api  Url</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder="Base Url"
                            value={formData.beatapi}
                            name="beatapi"
                            onChange={(event) => {
                                if (formDiabled) return;
                                const { name, value } = event.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={formDiabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label> Address</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder=""
                            value={formData.addre}
                            name="addre"
                            onChange={(event) => {
                                if (formDiabled) return;
                                const { name, value } = event.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={formDiabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Private key  Url</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder=""
                            value={formData.privatekey}
                            name="privatekey"
                            onChange={(event) => {
                                if (formDiabled) return;
                                const { name, value } = event.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={formDiabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>mnemonic</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder=""
                            value={formData.mnemonic}
                            name="mnemonic"
                            onChange={(event) => {
                                if (formDiabled) return;
                                const { name, value } = event.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={formDiabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Main Url</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder=""
                            value={formData.mainapi}
                            name="mainapi"
                            onChange={(event) => {
                                if (formDiabled) return;
                                const { name, value } = event.target;
                                setFormData({ ...formData, [name]: value });
                            }}
                            disabled={formDiabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Button variant="secondary" type='submit'>Save changes</Button>
                        <Button variant="outline-secondary" type='cancel'>Cancel</Button>
                    </Stack>c
                </Form>

            </>

        </>
    );
};

export default SettingDashboard;
