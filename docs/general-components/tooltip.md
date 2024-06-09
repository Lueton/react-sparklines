# Tooltip

This is a work in progress.

For now please refer to [Tooltip API](/api/general-components/tooltip).

## Discussion

Tooltips are a complicated part of chart libraries because they must provide a wide range of flexibility to fulfill the
users needs.
This is the reason why the current goal is to provide a simple solution for [Tooltips](/api/general-components/tooltip)
out of the box which might not need all requirements.
But in addition to that there is (or at least should) be a handy way to make custom tooltips possible.

As far as I know the current state-of-the-art tooltip library is [Floating UI](https://floating-ui.com/).
I was considering adding it as native solution but since Floating UI did not reach v1 so far and React
Sparklines aims to be as lightweight as possible the idea has been discarded for now. However, there is
a [minimal example](/recipes/floating-ui) of how to use Floating UI to create Tooltips in React Sparklines.