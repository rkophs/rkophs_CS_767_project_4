SOURCES=ps0.tex
OBJECTS=$(SOURCES:.tex=.pdf)

all: $(SOURCES)
	pdflatex --shell-escape $(SOURCES) && open $(OBJECTS)
clean:
	rm -rf *.log *.out *.aux *.toc _minted*
