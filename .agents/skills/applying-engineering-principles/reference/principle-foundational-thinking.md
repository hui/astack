# Foundational thinking

Before splitting work into components, sketch the data each caller reads or writes and who owns it. Choose the representation for the dominant access pattern and ask what happens if two actors update it concurrently. Establish the types or baseline check that later steps actually depend on first; defer speculative infrastructure.
