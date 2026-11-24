# Fix root causes

Reproduce the symptom and trace back to the first wrong decision. If the triggering state is legitimate, handle it at the consumer that misread it. If the state should never exist, fix its producer instead of suppressing the error downstream. Rerun the reproduction and a nearby legitimate case to show the fix did not merely hide the symptom.
