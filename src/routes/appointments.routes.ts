import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const router = Router();

const appointments: Appointment[] = [];

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'There is another appointment booked at this time' });
  }

  const appointment = new Appointment(provider, parsedDate);
  appointments.push(appointment);
  return response.json(appointment);
});

export default router;
