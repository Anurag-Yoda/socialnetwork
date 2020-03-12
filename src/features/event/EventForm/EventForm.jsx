import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import * as actionTypes from "../eventContants";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../common/form/TextInput";
import TextArea from "../../../common/form/TextArea";
import SelectInput from "../../../common/form/SelectInput";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from "revalidate";
import DateInput from "../../../common/form/DateInput";
import PlaceInput from "../../../common/form/PlaceInput";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.eventReducer.length > 0) {
    event = state.eventReducer.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const onCreateEvent = event => ({
  type: actionTypes.CREATE_EVENT,
  payload: event
});
const onUpdateEvent = event => ({
  type: actionTypes.UPDATE_EVENT,
  payload: event
});

const mapDispatchToProps = dispatch => {
  return {
    onCreateEvent: event => dispatch(onCreateEvent(event)),
    onUpdateEvent: event => dispatch(onUpdateEvent(event))
  };
};

const validate = combineValidators({
  title: isRequired({message: "Event title is required"}),
  category : isRequired({message: "Category is required"}),
  description: composeValidators(
    isRequired({message: "Please enter description"}),
    hasLengthGreaterThan(4)({message: 'Should have atleast 5 characters'})
      )(),
      city: isRequired('city'),
      venue: isRequired('venue')
})

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
  state = {
    ...this.props.event
  };

  handleTitleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.onUpdateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "bob"
      };
      this.props.onCreateEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  render() {
    const { history, initialValues, invalid, submitting, pristine } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form
              autoComplete="off"
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
              <Field
                name="title"
                component={TextInput}
                placeholder="Your Event Name"
              />
              <Field
                name="category"
                component={SelectInput}
                placeholder="Event Category"
                options={category}
              />
              <Field
                name="description"
                component={TextArea}
                placeholder="Describe your Event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field name="city" component={PlaceInput} placeholder="City" />
              <Field name="venue" component={TextInput} placeholder="Venue" />
              

              <Button disabled = {invalid || submitting || pristine}positive type="submit">
                Submit
              </Button>
              <Button
                type="button"
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm", validate })(EventForm));
