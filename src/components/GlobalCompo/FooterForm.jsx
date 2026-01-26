"use client";

import { Fragment, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitNewsletter, resetNewsletter } from "@/store/slices/newsletterSlice";

export default function FooterForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.newsletter);

  useEffect(() => {
    if (success) {
      message.success("Subscribed successfully!");
      form.resetFields();
      dispatch(resetNewsletter());
    }

    if (error) {
      message.error(error);
      dispatch(resetNewsletter());
    }
  }, [success, error, dispatch, form]);

  const onFinish = (values) => {
    dispatch(submitNewsletter(values));
  };

  return (
    <Fragment>
      <div className="newsletter-box">
        <h5>Sign Up For Our Newsletter</h5>
        <p>Insights, projects, and ideas straight from our studio.</p>

        <Form form={form} onFinish={onFinish} className="newsletter-form">
          <div className="row">
            <div className="col-sm-9">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email." },
                  { type: "email", message: "Invalid email format." },
                ]}
              >
                <Input placeholder="Enter your email" className="newsletter-input" />
              </Form.Item>
            </div>

            <div className="col-sm-3">
              <Button type="primary" htmlType="submit" loading={loading} className="newsletter-btn">
                Subscribe
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
