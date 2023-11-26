import * as React from "react";
import {
  Button,
  Html,
  Head,
  Text,
  Heading,
  Section,
  Row,
  Column,
  Hr,
  Tailwind,
} from "@react-email/components";
import format from "date-fns/format";

type PropTypes = {
  name: string;
  address: string;
  postcode: string;
  city: string;
  deadline: Date;
};

export default function NewTaskEmailTemplate({
  name,
  address,
  postcode,
  city,
  deadline,
}: PropTypes) {
  const deadlineDate = new Date(deadline);
  const formattedDeadlineDate = format(deadlineDate, "dd.MM.yyyy");

  return (
    <Tailwind>
      <Html>
        <Head>
          <title>New task has been assigned to you!</title>
        </Head>
        <Section>
          <Heading as="h1">New assignment!</Heading>
        </Section>
        <Hr />
        <Section>
          <Row>
            <Column className="text-lg">Task name: {name}</Column>
          </Row>
          <Hr />
          <Heading as="h3">Location</Heading>
          <Row>
            <Column className="text-lg">
              Address: {address}, {postcode}, {city}
            </Column>
          </Row>
          <Hr />
          <Heading as="h3">Other</Heading>
          <Row>
            <Column className="text-lg">
              Deadline: {formattedDeadlineDate}
            </Column>
          </Row>
          <Hr />
        </Section>
      </Html>
    </Tailwind>
  );
}
