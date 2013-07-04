class AnnotationsController < ApplicationController
  
  def create
    @annotation = current_user.annotations.build(params[:annotation])
    if @annotation.save
      render json: @annotation
    else
      render json: @annotation.errors.full_messages, status: 422
    end
  end

  def update
  end

  def destroy
    @annotation = Annotation.find(params[:id])
    if @annotation.annotator == current_user
      @annotation.destroy
      render json: {message: "Annotation deleted."}
    else
      render json: {}, status: 403
    end
  end

  def show
  end
end
