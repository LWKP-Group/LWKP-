"use client";

import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetContactForm } from "@/store/slices/contactFormSlice";

export default function ContactForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.contactForm);

  useEffect(() => {
    if (success) {
      message.success("Message sent successfully!");
      form.resetFields();
      dispatch(resetContactForm());
    }

    if (error) {
      message.error(error);
      dispatch(resetContactForm());
    }
  }, [success, error, dispatch, form]);

  const onFinish = (values) => {
    dispatch(submitContactForm(values));
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="contact-form">
      <Form.Item label="Your Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Your Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Your Message" name="message" rules={[{ required: true, message: "Please enter your message" }]}>
        <Input.TextArea rows={5} placeholder="Write your message here..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send Message →
        </Button>
      </Form.Item>
    </Form>
  );
}
